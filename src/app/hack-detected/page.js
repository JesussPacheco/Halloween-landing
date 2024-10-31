'use client';
import React from 'react';
import HalloweenLanding from '../components/HalloweenLanding';
import InstagramButton from '../components/InstagramButton';

export default function HackDetectedPage() {
  return (
    <HalloweenLanding 
    customText="TU CORAZÓN HA SIDO HACKEADO 💘"
    customButton={<InstagramButton username="jhamil.alanyap" />} // Cambia esto por tu segundo usuario de Instagram
    />
  );
}