import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const StatusSection = ({ consultationDetails }) => {
    const [status, setStatus] = useState(consultationDetails.status);

    useEffect(() => {
        setStatus(consultationDetails.status);
    }, [consultationDetails.status]);

    return (
        <>
            <div className="w-full">
                <h3 className="text-lg font-semibold  text-lightBlue">Estado:</h3>
                <p className="mb-4 w-full text-xl font-medium h-auto break-words">
                    {status}
                </p>
            </div>
        </>
    );
};

StatusSection.propTypes = {
    consultationDetails: PropTypes.shape({
        status: PropTypes.string.isRequired,
    }).isRequired,
};