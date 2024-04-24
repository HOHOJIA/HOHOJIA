import Image from "next/image";
import Home from "@/app/components/home/Home";
import Header from "./components/Header";

export default function Index() {
    return (
        <main className="">
            <Header />
            <Home />
        </main>
    );
}
