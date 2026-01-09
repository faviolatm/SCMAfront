// src/hooks/useEvaluationForm.js
import { useState, useEffect } from 'react';
import EvaluationService from '../../../services/EvaluationService';
import ItemService from '../../../services/ItemService';
import ResponseService from '../../../services/ResponseService';

/**
 * Custom hook to manage evaluation form state and operations
 */
export const useEvaluationForm = (evaluationId) => {
  const [evaluation, setEvaluation] = useState(null);
  const [formStructure, setFormStructure] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (evaluationId) {
      loadEvaluationData();
    }
  }, [evaluationId]);

  const loadEvaluationData = async () => {
    setLoading(true);
    
    try {
      const [evalData, treeData, responsesData] = await Promise.all([
        EvaluationService.getEvaluationById(evaluationId),
        ItemService.getTree(),
        ResponseService.getResponsesByEvaluation(evaluationId)
      ]);
      
      setEvaluation(evalData);
      setFormStructure(treeData?.data || []);
      
      // Convert responses array to map: { section_id: { option_id, score } }
      const responsesMap = {};
      if (responsesData && Array.isArray(responsesData)) {
        responsesData.forEach(resp => {
          responsesMap[resp.section_id] = {
            option_id: resp.option_id,
            score: resp.score
          };
        });
      }
      setResponses(responsesMap);
    } catch (error) {
      console.error('Error loading evaluation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectOption = (sectionId, optionId, score) => {
    if (evaluation?.status === 'completed') return;
    
    setResponses(prev => ({
      ...prev,
      [sectionId]: { option_id: optionId, score }
    }));
  };

  const completeEvaluation = async () => {
    const totalSections = formStructure.reduce(
      (acc, cat) => acc + cat.sections.length, 
      0
    );
    const answeredSections = Object.keys(responses).length;
    
    if (answeredSections < totalSections) {
      return {
        success: false,
        message: `You must answer all sections. Answered ${answeredSections} of ${totalSections}`
      };
    }
    
    setSaving(true);
    
    try {
      // Convert responses to bulk format
      const bulkResponses = Object.entries(responses).map(([section_id, data]) => ({
        evaluation_id: parseInt(evaluationId),
        section_id: parseInt(section_id),
        option_id: data.option_id,
        score: data.score,
        notes: null
      }));
      
      // Save all responses
      await ResponseService.createBulkResponses(evaluationId, bulkResponses);
      
      // Complete evaluation
      const result = await EvaluationService.completeEvaluation(evaluationId);
      
      if (result) {
        return { success: true, message: 'Evaluation completed successfully' };
      } else {
        return { success: false, message: 'Error completing evaluation' };
      }
    } catch (error) {
      console.error('Error completing evaluation:', error);
      return { success: false, message: error.message };
    } finally {
      setSaving(false);
    }
  };

  const calculateProgress = () => {
    const totalSections = formStructure.reduce(
      (acc, category) => acc + (category.sections?.length || 0), 
      0
    );
    const answeredSections = Object.keys(responses).length;
    const percentage = totalSections > 0 
      ? Math.round((answeredSections / totalSections) * 100) 
      : 0;
    const isComplete = totalSections > 0 && answeredSections === totalSections;

    return {
      total: totalSections,
      answered: answeredSections,
      percentage,
      isComplete
    };
  };

  return {
    evaluation,
    formStructure,
    responses,
    loading,
    saving,
    selectOption,
    completeEvaluation,
    calculateProgress
  };
};