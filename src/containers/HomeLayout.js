import React, {Fragment} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomeLayout(props) {
    const {children} = props;
    return (
        <Fragment>
            <Header />
            <main>{children}</main>
            <Footer />
        </Fragment>
    );
}
