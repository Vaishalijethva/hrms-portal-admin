"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

export default function PopupModal({ isOpen, onClose, title, children}) {
    // if(!isOpen) return null;
    // const [isOpenPopup, setIsOpenPopup] = useState(false);

    return(
        <>
        {/* <div className="flex inset-[0] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 fixed">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <Button onClick={onClose}>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" />
                </Button>

                <Button onClick={() => setIsOpenPopup(true)} />
                <Popup isOpenPopup={isOpenPopup} onClose={() => setIsOpenPopup(false)}>
                    <h2 className="text-xl font-bold mb-4">Popup Content</h2>
                    <p>This is a popup message.</p>
                </Popup>
            </div>
        </div> */}
        </>
    )
}