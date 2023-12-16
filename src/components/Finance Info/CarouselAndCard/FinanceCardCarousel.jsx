import React, { useState, useEffect } from "react";
import "../../../utils/css/cardcarousel.css";

import FinanceCard from "./FinanceCard";
import { fetchAllFinances } from "../../../utils/APIS/FinancesAPIS";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const FinanceCardCarousel = () => {
  const [allFinancesData, setAllFinancesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentIndexes, setCurrentIndexes] = useState([]);
  
  //fetch all finances list start
  useEffect(() => {
    const allFinances = () => {
      fetchAllFinances()
        ?.then((response) => {
          setAllFinancesData(response?.data);
          setLoading(true);
          setCurrentIndexes(
            Array.from(
              { length: Math.min(4, response?.data?.length) },
              (_, i) => i
            )
          );
        })
        .catch((error) => {
          console.log("error while fetching finance", error);
        });
    };
    allFinances();
  }, []);
  //fetch all finances list end

  // card slider design start  
  let displayFinanceData = currentIndexes.map((e) => allFinancesData[e]);
  const totalFinances = allFinancesData.length;

  const nextCards = () => {
    setCurrentIndexes((prevIndexes) =>
      prevIndexes.map((index) => (index + 1) % totalFinances)
    );
  };

  const prevCards = () => {
    setCurrentIndexes((prevIndexes) =>
      prevIndexes.map((index) => (index - 1 + totalFinances) % totalFinances)
    );
  };

  // card slider design end

  return (
    <div className="carousel-container">
      <FontAwesomeIcon
        className="leftBtn"
        icon={faChevronLeft}
        onClick={() => prevCards()}
      />

      {loading &&
        displayFinanceData?.map((finances, index) => {
          return <FinanceCard key={index} {...finances} />;
        })}

      <FontAwesomeIcon
        className="rightBtn"
        icon={faChevronRight}
        onClick={() => nextCards()}
      />
    </div>
  );
};

export default FinanceCardCarousel;
