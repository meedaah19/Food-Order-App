import React from "react";
import loadingGif from "../assets/download.png";

export default function LoadingSpinner() {
    return (
        <div className="loading-overlay">
            <img src={loadingGif} alt="Loading..." />
        </div>
    );
}
