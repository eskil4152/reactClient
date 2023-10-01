import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { Header } from "./globalPages/header";
import { Footer } from "./globalPages/footer";
import { Login } from "./login/login";
import { MainPage } from "./mainPage";
import { ViewAllPeople } from "./peoplePages/allPeople";
import { FindPerson } from "./peoplePages/findPerson";
import { AddPerson } from "./peoplePages/addPerson";
import { ChangePerson } from "./peoplePages/changePerson";
import { Register } from "./login/register";

export function Application() {
  return (
    <BrowserRouter>
      <header className={"header"}>
        <Header />
      </header>
      <main id={"main"}>
        <Routes>
          <Route path={"/"} element={<MainPage />} />

          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />

          <Route path={"/all"} element={<ViewAllPeople />} />
          <Route path={"/search"} element={<FindPerson />} />
          <Route path={"/add"} element={<AddPerson />} />
          <Route path={"/change"} element={<ChangePerson />} />

          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
      <footer className={"footer"}>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}
