'use client';
import React from 'react';
import HalloweenLanding from '../components/HalloweenLanding';
import InstagramButton from '../components/InstagramButton';

export default function SistemaVulneradoPage() {
  return (
    <HalloweenLanding 
      customText="TU CORAZÓN HA SIDO HACKEADO 💘"
      customButton={<InstagramButton username="jesuspachec0" />}
    />
  );
}