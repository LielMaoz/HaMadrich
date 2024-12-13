import React from 'react';

const FirstAidTeamworkPage: React.FC = () => {
    return (
        <div>
            <h1>First Aid Teamwork</h1>
            <p>Welcome to the First Aid Teamwork page. Here you will find resources and information on how to effectively work as a team in first aid situations.</p>
            <section>
                <h2>Team Roles</h2>
                <ul>
                    <li>Leader: Coordinates the team and makes decisions.</li>
                    <li>First Responder: Provides immediate care to the injured.</li>
                    <li>Communicator: Contacts emergency services and relays information.</li>
                    <li>Logistics: Manages supplies and equipment.</li>
                </ul>
            </section>
            <section>
                <h2>Best Practices</h2>
                <ol>
                    <li>Stay calm and focused.</li>
                    <li>Communicate clearly and effectively.</li>
                    <li>Follow established protocols and procedures.</li>
                    <li>Work together and support each other.</li>
                </ol>
            </section>
        </div>
    );
};

export default FirstAidTeamworkPage;