import Cookies from "js-cookie";
import useShowAlert from "@/hooks/useShowAlert";
import { Input, Checkbox, Link } from "@nextui-org/react";
import PasswordBtn from "@/app/components/login/PasswordBtn";
import SubmitBtn from "@/app/components/login/SubmitBtn";

export default function LoginInfo({
  onSelected,
  loginData,
}: {
  onSelected: (selectState: string) => void;
  loginData: (logindata: object) => Promise<any>;
}) {
  const showAlert = useShowAlert();

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values = Object.fromEntries(formData.entries());
    console.log(values);

    loginData(values)
      .then((responseData) => {
        Cookies.set("access_token", responseData.data.access_token);
        //   , {
        //   expires: 7,
        // });
        console.log("access_token:", responseData.data.access_token);
        showAlert("Success!", "登入成功！", "success");
        setTimeout(() => {
          window.location.href = "/"; // login success, redirect to home page
        }, 1000);
      })
      .catch((error) => {
        showAlert("Oops...", `登入失敗，${error}`, "error");
      });
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="flex flex-wrap justify-center gap-5 my-5 ">
        <Input
          type="email"
          label="電子信箱"
          variant="bordered"
          className="max-w-xs"
          name="email"
        />
        <PasswordBtn label="密碼" size="md" name="password" />

        <div className="flex justify-between w-full px-5 my-5">
          <Checkbox defaultSelected size="sm">
            <p className="text-neutral-400">記住登入資訊</p>
          </Checkbox>

          <Link href="" size="sm" underline="always" className="text-amber-400">
            忘記密碼？
          </Link>
        </div>
      </div>
      <SubmitBtn
        btn="登入"
        hint="HOHOJIA新夥伴嗎？"
        changeBtn="來去註冊"
        selectState="signup"
        onSelected={onSelected}
      />
    </form>
  );
}
