// KanjiLevelLearning.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Learning from './learning';

function KanjiLevelLearning() {
  const { level } = useParams();
  
  return <Learning/>;
}

export default KanjiLevelLearning;
