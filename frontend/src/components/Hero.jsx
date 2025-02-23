import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='h-[80vh] flex justify-center items-center'>
    <div className="text-center  text-gray-200 space-y-4">
      <h1 className="text-5xl font-bold tracking-wide">AI IMAGE GENERATOR</h1>
      <h2 className="text-2xl font-medium">🤖 AI generates script & images in seconds</h2>
      <h3 className="text-lg opacity-80">⚡ Create, edit, and publish images with ease</h3>
      <Link to={"/create"}>
      <Button className="mt-4 px-6 py-3 text-lg font-medium">Get Started</Button>
      </Link>
    </div>
    </div>
  );
};

export default Hero;
