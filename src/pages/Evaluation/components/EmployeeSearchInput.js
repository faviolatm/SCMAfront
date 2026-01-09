import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, User, X, ChevronDown } from 'lucide-react';
import BaseApiService from '../../../services/BaseApiService';

const EmployeeSearchInput = React.memo(({ value, onChange, onEmployeeSelect, placeholder = "Search by USERID or name...", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Buscar empleado por USERID
  const searchEmployeeByUserid = useCallback(async (userid) => {
    try {
      const response = await BaseApiService.get(`/employees/${userid}`);
      if (response.success && response.data) {
        const employee = response.data;
        setSelectedEmployee(employee);
        setSearchQuery(`${employee.userid} - ${employee.name}`);
        if (onEmployeeSelect) {
          onEmployeeSelect(employee);
        }
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  }, [onEmployeeSelect]);

  // Cargar empleado pre-seleccionado
  useEffect(() => {
    if (value && !selectedEmployee) {
      searchEmployeeByUserid(value);
    } else if (!value && selectedEmployee) {
      setSelectedEmployee(null);
      setSearchQuery('');
    }
  }, [value, searchEmployeeByUserid]);

  // Buscar empleados
  const searchEmployees = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await BaseApiService.get(`/employees/search?query=${encodeURIComponent(query)}`);
      setEmployees(response.data || []);
    } catch (error) {
      console.error('Error searching employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.length >= 2 && isOpen) {
      searchTimeoutRef.current = setTimeout(() => {
        searchEmployees(searchQuery);
      }, 300);
    } else {
      setEmployees([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, isOpen, searchEmployees]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length === 0) {
      setSelectedEmployee(null);
      onChange('');
      if (onEmployeeSelect) {
        onEmployeeSelect(null);
      }
      setEmployees([]);
    }
    
    if (!isOpen && query.length >= 2) {
      setIsOpen(true);
    }
  }, [isOpen, onChange, onEmployeeSelect]);

  const handleEmployeeSelect = useCallback((employee) => {
    setSelectedEmployee(employee);
    setSearchQuery(`${employee.userid} - ${employee.name}`);
    onChange(employee.userid);
    if (onEmployeeSelect) {
      onEmployeeSelect(employee);
    }
    setIsOpen(false);
  }, [onChange, onEmployeeSelect]);

  const handleClear = useCallback(() => {
    setSelectedEmployee(null);
    setSearchQuery('');
    onChange('');
    if (onEmployeeSelect) {
      onEmployeeSelect(null);
    }
    setEmployees([]);
    inputRef.current?.focus();
  }, [onChange, onEmployeeSelect]);

  const handleInputFocus = useCallback(() => {
    if (searchQuery.length >= 2) {
      setIsOpen(true);
    }
  }, [searchQuery.length]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
        />
        {selectedEmployee && (
          <button 
            type="button" 
            onClick={handleClear} 
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
        {!selectedEmployee && searchQuery && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* Selected employee info */}
      {selectedEmployee && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{selectedEmployee.name}</p>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-medium">Region:</span> {selectedEmployee.region || 'N/A'}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Business Segment:</span> {selectedEmployee.business_segment || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
              Searching...
            </div>
          ) : employees.length > 0 ? (
            <ul className="py-1">
              {employees.map((employee) => (
                <li key={employee.userid}>
                  <button
                    type="button"
                    onClick={() => handleEmployeeSelect(employee)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">{employee.userid}</span>
                          <span className="text-gray-500">-</span>
                          <span className="text-gray-700 text-sm truncate">{employee.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {employee.region && <span>Region: {employee.region}</span>}
                          {employee.region && employee.business_segment && <span> • </span>}
                          {employee.business_segment && <span>{employee.business_segment}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : searchQuery.length >= 2 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No employees found matching "{searchQuery}"</div>
          ) : (
            searchQuery.length > 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">Type at least 2 characters to search</div>
            )
          )}
        </div>
      )}
    </div>
  );
});

EmployeeSearchInput.displayName = 'EmployeeSearchInput';

export default EmployeeSearchInput;