import Header from "../components/Header";
import Banner from "../components/details/Banner";
import Ingredients from "../components/details/Ingredients";
import AuthorInfo from "../components/details/AuthorInfo";
import Steps from "../components/details/Steps";
import Tips from "../components/details/Tips";
import Comments from "../components/details/Comments";
import Footer from "../components/Footer";

export default function Details() {
    return (
        <main className="">
            <Header />

            <div className="flex flex-col items-start w-full gap-12 px-32 pt-16 pb-40">
                <Banner />
                <div className="flex justify-between w-full">
                    <Ingredients />
                    <AuthorInfo />
                </div>
                <Steps />
                <Tips />
                <Comments />
            </div>

            <Footer />
        </main>
    );
}
