import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HeadingUnderline from "./HeadingUnderline";
import Button from "./Button";

import { fetchMoviesStorage } from "../utils/tzkt";

export default function RegisterTheaterModal({ data, setOpenRegisterTheaterModal }) {

    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [current, setCurrent] = useState(0);
    const [cityName, setCityName] = useState("");


    const fetchData = async () => {
        try {
            const storage = await fetchMoviesStorage();
            const cityIds = storage.cityIds;

            const cityDetails = storage.cityDetails;

            const compiledCityDetails = [];

            for (let i = 0; i < cityIds; i++) {

                const fetchedObject = {
                    cityName: cityDetails[i].name,
                    cityId: i,
                };
                compiledCityDetails.push(fetchedObject);

            }
            setCities(compiledCityDetails)
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addCity = async () => {
        // City name to add -> cityName
    }


    return (
        <div
            onClick={() => {
                setOpenRegisterTheaterModal(false);
            }}
            className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-start pt-[15vh] md:pt-[30vh] bg-black/70 md:px-20"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center p-50 pt-[20px] gap-[50px] bg-primaryBg border-[2px] border-primary rounded-20 w-full lg:w-3/4"
            >
                {
                    loading
                        ? "Loading..."
                        : <>
                            <HeadingUnderline>
                                List your theater
                            </HeadingUnderline>

                            <div className="flex flex-col gap-[30px] flex-wrap w-full md:w-3/4 max-h-[calc(70vh-150px)]">
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <p className="font-poppins text-lg font-medium w-[8ch]">Name:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. PVR VEGA Bengaluru ...."
                                    />
                                </div>
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <p className="font-poppins text-lg font-medium w-[8ch]">City:</p>
                                    <select
                                        onChange={(e) => {
                                            setCurrent(e.target.value);
                                        }}
                                        className="px-15 py-10 rounded-10 outline-none bg-transparent bg-blackToTrans border-primary"
                                    >
                                        {cities &&
                                            cities.length &&
                                            cities.map((item, index) => {
                                                return (
                                                    <option value={index} className="bg-primaryBg">
                                                        {item.cityName}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <p className="font-poppins text-sm text-white50">OR</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Add a city name"
                                        value={cityName}
                                        onChange={(e) => setCityName(e.target.value)}
                                    />
                                    <Button onClick={addCity}>Add City</Button>
                                </div>
                                <div className="flex flex-row gap-4 items-center w-full">
                                    <p className="font-poppins text-lg font-medium w-[8ch]">Location:</p>
                                    <input
                                        type="text"
                                        className="px-15 py-10 flex-1 border-primary outline-none font-poppins text-sm bg-white/5 rounded-10"
                                        placeholder="Eg. PVR Cinemas, Vega City ...."
                                    />
                                </div>
                                <Button
                                    weight={"800"}
                                >
                                    Register your Theatre →
                                </Button>
                            </div>

                        </>
                }
            </div>
        </div>
    );
}
