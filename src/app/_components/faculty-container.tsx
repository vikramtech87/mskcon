import React from "react";

type FacultyContainerProps = {
    children: React.ReactNode
}

const FacultyContainer = ({ children }: FacultyContainerProps) => {
    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
        {children}
    </div>);
}

export default FacultyContainer;