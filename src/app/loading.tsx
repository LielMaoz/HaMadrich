import Image from "next/image";

export default function Loading() {
    return (
      <div style={{ 
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          position: "fixed",
          top: 0,
          left: 0, 
          width: "100vw",
          height: "100vh",
          display: "flex", 
          flexDirection: "column",  
          justifyContent: "center", 
          alignItems: "center", 
          zIndex: 1000, 
      }}>
        <Image
          src="/images/Shootingloader.gif"
          alt="טוען..."
          width={500}
          height={500}
          style={{
            display: "block",
            maxWidth: "40%",
            height: "auto",
          }}
          unoptimized={true}
        />
        <p style={{
        marginTop: "20px",
        fontSize: "1.5rem",
        color: "white",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}>
        אנא המתן, טוען...
      </p>
      </div>
    );
  }