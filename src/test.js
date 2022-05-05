import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const Test = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const d = location.state.from;
  return (
    <div>test</div>
  )
}

export default test