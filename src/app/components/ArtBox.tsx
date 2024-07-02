// components/ThreeScene.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const ArtBox = () => {
    const sceneRef = useRef(null);
    const draggableRef = useRef(null);

    useEffect(() => {
        const draggable = draggableRef.current;
        let offset = { x: 0, y: 0 };
        let isDragging = false;

        // Function to handle mouse down event
        const onMouseDown = (event) => {
            isDragging = true;
            const rect = draggable.getBoundingClientRect();
            offset.x = event.clientX - rect.left;
            offset.y = event.clientY - rect.top;
        };

        // Function to handle mouse up event
        const onMouseUp = () => {
            isDragging = false;
        };

        // Function to handle mouse move event
        const onMouseMove = (event) => {
            if (isDragging) {
                const x = event.clientX - offset.x;
                const y = event.clientY - offset.y;
                gsap.to(draggable, { x, y, duration: 0.1, ease: 'power2.out' }); // Use ease for smoother animation
            }
        };

        // Add event listeners
        draggable.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);

        // Initial position calculation
        const initialX = (window.innerWidth - draggable.offsetWidth) / 2;
        const initialY = (window.innerHeight - draggable.offsetHeight) / 2;

        // Set initial position
        gsap.set(draggable, { x: initialX, y: initialY });

        // Cleanup event listeners
        return () => {
            draggable.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div ref={sceneRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <div ref={draggableRef} style={{ position: 'absolute', width: '100px', height: '100px', backgroundColor: 'red' }} />
        </div>
    );
};



export default ArtBox;
