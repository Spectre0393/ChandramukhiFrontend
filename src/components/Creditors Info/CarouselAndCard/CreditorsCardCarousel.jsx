import React, { useState, useEffect } from "react";
import "../../../utils/css/cardcarousel.css";

import CreditorsCard from "./CreditorsCard";
import { fetchAllCreditors } from "../../../utils/APIS/CreditorsAPIS";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const CreditorsCardCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [allCreditorsData, setAllCreditorsData] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState([]);

  useEffect(() => {
    const allCreditors = () => {
      fetchAllCreditors()
        ?.then((response) => {
          setAllCreditorsData(response?.data);
          setLoading(true);
          setCurrentIndexes(
            Array.from(
              { length: Math.min(4, response?.data?.length) },
              (_, i) => i
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };
    allCreditors();
  }, []);

  // card slider design start
  let displayCreditorsData = currentIndexes.map((e) => allCreditorsData[e]);
  const totalCreditors = allCreditorsData.length;

  const nextCards = () => {
    setCurrentIndexes((prevIndexes) =>
      prevIndexes.map((index) => (index + 1) % totalCreditors)
    );
  };

  const prevCards = () => {
    setCurrentIndexes((prevIndexes) =>
      prevIndexes.map((index) => (index - 1 + totalCreditors) % totalCreditors)
    );
  };
  // card slider design end

  // my code for card rotation
  /*     function nextCards() {
      let indexes = [];
      currentIndexes.map((position, index) => {
        if (position === totalCreditors - 1) {
          return indexes.push((position = 0));
        } else {
          return indexes.push(position + 1);
        }
      });
      setCurrentIndexes(indexes);
      displayCreditorsData = currentIndexes.map((e) => allCreditorsData[e]);
    }

    function prevCards() {
      let indexes = [];
      currentIndexes.map((position, index) => {
        if (position === 0) {
          return indexes.push((position = totalCreditors - 1));
        } else {
          return indexes.push(position - 1);
        }
      });
    setCurrentIndexes(indexes);
    displayCreditorsData = currentIndexes.map((e) => allCreditorsData[e]);
    } */

  return (
    <div className="carousel-container">
      <FontAwesomeIcon
        className="leftBtn"
        icon={faChevronLeft}
        onClick={() => prevCards()}
      />

      {loading &&
        displayCreditorsData?.map((creditors, index) => {
          return <CreditorsCard key={index} {...creditors} />;
        })}

      <FontAwesomeIcon
        className="rightBtn"
        icon={faChevronRight}
        onClick={() => nextCards()}
      />
    </div>
  );
};

export default CreditorsCardCarousel;
