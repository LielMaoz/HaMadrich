import React from 'react';

const RifleTrainingPage: React.FC = () => {
    return (
        <div>
            <h1>Rifle Training</h1>
            <p>Welcome to the rifle training page. Here you will find all the necessary information and resources to improve your rifle skills.</p>
            <section>
                <h2>Training Modules</h2>
                <ul>
                    <li>Module 1: Safety and Handling</li>
                    <li>Module 2: Basic Marksmanship</li>
                    <li>Module 3: Advanced Techniques</li>
                </ul>
            </section>
            <section>
                <h2>Resources</h2>
                <ul>
                    <li><a href="#safety-guide">Safety Guide</a></li>
                    <li><a href="#marksmanship-tips">Marksmanship Tips</a></li>
                    <li><a href="#advanced-techniques">Advanced Techniques</a></li>
                </ul>
            </section>
        </div>
    );
};

export default RifleTrainingPage;