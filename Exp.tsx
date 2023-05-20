import React, { Component } from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Navbar from "./ExpExp/Navbar";

const ExpWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.2) inset;
  display: flex;
  flex-direction: column;
`;

const Overview = styled.div`
  border-radius: 25px;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: green;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    color: grey;
  }
  span {
    font-size: 2rem;
  }
  h6 {
    font-size: 0.7rem;
    color: grey;
  }
`;

const Exp = () => {
  const [userData, setUserData] = useState<any>();
  const [accountSum, setAccountSum] = useState<number | undefined>();

  const month = new Date();
  const monthOptions = { month: "long" as const };
  const formattedMonth = month.toLocaleString("en-US", monthOptions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/ananduremanan/tempDirectory/main/tempData.json"
        );
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userData && userData.accounts) {
      const sum = userData.accounts.reduce(
        (total: number, account: any) =>
          total + account[Object.keys(account)[0]],
        0
      );
      setAccountSum(sum);
    }
  }, [userData]);

  return (
    <ExpWrapper>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* Render your components here */}
            <Navbar />
            {userData && (
              <Overview>
                <>
                  <h1>
                    {accountSum}
                    <span>₹</span>
                  </h1>
                  <p>Your Current Balance</p>
                  <div className="row">
                    {userData &&
                      Array.isArray(userData.accounts) &&
                      userData.accounts.map((account: any) => {
                        const accountName = account.accountName;
                        const accountBalance = Object.values(
                          account
                        )[0] as string;

                        return (
                          <div
                            className="col-6"
                            key={accountName}
                            style={{
                              width: "10rem",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <h2>
                              {accountBalance}
                              <span style={{ fontSize: "1rem" }}>₹</span>
                            </h2>
                            <p>{accountName}</p>
                          </div>
                        );
                      })}
                  </div>
                  <div className="row">
                    <div className="col text-center">
                      <h6>Click to update the current balance</h6>
                    </div>
                  </div>
                </>
              </Overview>
            )}
          </div>
        </div>
      </div>
    </ExpWrapper>
  );
};

export default Exp;
