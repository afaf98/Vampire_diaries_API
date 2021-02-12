import React from "react";

import "./HomePage.scss";
import Explorer from "./Explorer";
import ApiKeyForm from "./ApiKeyForm";
import Header from "../Jumbotron/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Explorer />
      <ApiKeyForm />
    </div>
  );
}
