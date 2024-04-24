import Header from "../components/Header";
import Banner from "../components/details/Banner";
import Ingredients from "../components/details/Ingredients";
import AuthorInfo from "../components/details/AuthorInfo";

export default function Details() {
    return (
        <div>
            <Header />

            <div className="flex flex-col items-start w-full gap-10 px-32 py-20">
                <Banner />
                <div className="flex justify-between w-full">
                    <Ingredients />
                    <AuthorInfo />
                </div>
            </div>
        </div>
    );
}
