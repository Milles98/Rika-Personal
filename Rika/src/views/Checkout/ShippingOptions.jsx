import InputField from "../sections/fields/InputField"
import ArrowBack from "../../common/ArrowBack"
import { useState, } from 'react';
import { useShippingContext } from "../../lib/ShippingOptionsProvider";

const ShippingOptions = () => {
    const { getServicePoints, getTransitTimes } = useShippingContext();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        postalCode: '',
    });
    const [servicePoints, setServicePoints] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [transitTime, setTransitTime] = useState([]);

    const validate = () => {
        const errors = {};
        if (!formData.postalCode) errors.postalCode = "Postal code is required.";
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (/^\d*$/.test(value)) {
            setFormData({ ...formData, [name]: value });
            setIsConfirmed(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log("Shipping options submitted", formData);
            setLoading(true);
            try {
                const result = await getServicePoints(formData);
                if (result) {
                    console.log("Service points successfully shown:", result);
                    setServicePoints(result);
                    setErrors({});
                }
                else {
                    setServicePoints([]);
                    setErrors({ postalCode: "No service points found." });
                }
            } catch (error) {
                console.error("Error showing service points:", error);
                setErrors({ postalCode: "Failed to load service points. Please try again." });
            }
            finally {
                setLoading(false);
            }
        }
    };

    const handleCardClick = async (servicePoint) => {
        setSelectedLocation(servicePoint);
        console.log("Selected service point:", servicePoint);

        try {
            const transitData = await getTransitTimes(servicePoint.visitingAddress.postalCode);
            console.log("Transit time data:", transitData);
            setTransitTime(transitData || []);
        } catch (error) {
            console.error("Error fetching transit times:", error);
            setTransitTime([]);
        }
    };

    const handleDeliveryOption = (option) => {
        setSelectedDeliveryOption(option);
    };


    const handleConfirm = () => {
        if (selectedDeliveryOption) {
            setIsConfirmed(true);
            console.log("Delivery confirmed:", selectedLocation, selectedDeliveryOption);
            setSelectedLocation(null);
        }
    };

    //Implement real navigation here
    const navigateToPayment = () => {
        window.location.href = "/products";
    };


    return (
        <div className="min-h-screen bg-gray-300 p-4 flex flex-col items-center">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
                <div className="flex items-center justify-between mb-6">
                    <ArrowBack goBackTo="/admin" />
                    <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Shipping Options</h2>
                    <div className="sm:w-6"></div>
                </div>
                {/* Postal Code Input */}
                <InputField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    type="text"
                    error={errors.postalCode}
                />

                {/* Submit Button */}
                <button
                    id="createButton"
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                    disabled={loading}>
                    {loading ? "Loading..." : "Show Service Points"}
                </button>
            </form>

            {/* Service Points Section */}
            {servicePoints.length > 0 && (
                <div className="w-full max-w-md">
                    <div className="flex justify-center">
                        <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/688/PostNord-logo-1024.png" alt="Postnord" className="w-40 -mb-10 -mt-6" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto">
                        {servicePoints.map((point) => (
                            <div
                                key={point.servicePointId}
                                onClick={() => handleCardClick(point)}
                                className={`p-4 border rounded bg-white shadow cursor-pointer hover:bg-gray-100 ${selectedLocation?.servicePointId === point.servicePointId
                                    ? "border-green-500"
                                    : "border-gray-300"
                                    }`}>
                                <h4 className="font-bold text-gray-700">{point.name}</h4>
                                <p>
                                    Address: {`${point.visitingAddress?.streetName}, ${point.visitingAddress?.city}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal for Selected Location */}
            {selectedLocation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
                        <h3 className="font-bold text-gray-800 mb-4">Selected Pickup Location</h3>
                        <p><strong>Name:</strong> {selectedLocation.name}</p>
                        <p>
                            <strong>Address:</strong> {`${selectedLocation.visitingAddress?.streetName}, ${selectedLocation.visitingAddress?.streetNumber} ${selectedLocation.visitingAddress?.city}`}
                        </p>
                        <p><strong>Service Point ID:</strong> {selectedLocation.servicePointId}</p>

                        {/* Transit Time Information */}
                        {transitTime && transitTime.length > 0 ? (
                            <div className="mt-4">
                                <p className="mb-1 text-gray-800"><strong>Delivery Options:</strong></p>
                                <ul className="space-y-2">
                                    {transitTime
                                        .filter((_, index) => [3, 5, 8, 9].includes(index))
                                        .map((time, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleDeliveryOption(time)}
                                                className={`p-2 border rounded cursor-pointer shadow hover:bg-green-200 ${selectedDeliveryOption === time ? "bg-green-200 border-green-500" : "bg-gray-100"
                                                    }`}
                                            >
                                                <p><strong>Type:</strong> {time.serviceInformation?.name || "N/A"}</p>
                                                <p><strong>Arrival:</strong> {new Date(time.timeOfArrival).toLocaleDateString()}</p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="mt-4 text-red-500">Transit time information is unavailable.</p>
                        )}



                        <button
                            onClick={handleConfirm}
                            className={`mt-4 w-full bg-green-800 text-white p-2 rounded hover:bg-gray-800`}>
                            Confirm Delivery
                        </button>
                    </div>
                </div>
            )}


            {/* Proceed to Payment Button */}
            <div className="w-full max-w-md mt-3">
                {isConfirmed && (
                    <button
                        id="proceedToPaymentButton"
                        onClick={navigateToPayment}
                        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                        disabled={!isConfirmed || loading}>
                        {loading ? "Loading..." : "Proceed to Payment"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ShippingOptions