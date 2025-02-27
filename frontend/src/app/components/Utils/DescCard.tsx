'use client';

import React from 'react';
import styled from 'styled-components';

interface DescCardProps {
  title: string;
  description: string;
}

const Card: React.FC<DescCardProps> = ({ title, description }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .card {
    width: 300px;
    padding: 25px;
    background: rgba(255, 118, 136, 0.2);
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(255, 118, 136, 0.4);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 80%);
    transform: rotate(25deg);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover::before {
    opacity: 1;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(255, 118, 136, 0.6);
  }

  .card-title {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .card-description {
    color: #fff;
    font-size: 18px;
    opacity: 0.9;
    line-height: 1.5;
  }
`;

export default Card;
