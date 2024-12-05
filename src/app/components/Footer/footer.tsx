import React from "react";
import { Copyright } from 'lucide-react';

const Footer: React.FC = () => {
    return (
    <footer className={"fixed bottom-0 w-full bg-gray-900 text-white text-center py-3"}>
        <p>
            כל הזכויות שמורות לצוות המדריך
            <Copyright className="w-5 h-5 inline mr-2" />
        </p>
        <p>
                יחד ננצח {" "}
                <span className="text-blue-500">💙</span> {/*blue heart*/}
            </p>
    </footer>
        )
    };

//footer className="fixed bottom-0 w-full text-white text-center py-3" style={{ backgroundColor: "#4CAF50" }}
/*
const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '16px',
};

const textStyle: React.CSSProperties = {

};
*/

export default Footer;