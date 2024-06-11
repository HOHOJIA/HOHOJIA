import { useState, useEffect } from "react";
import useShowAlert from "@/hooks/useShowAlert";
import { Input } from "@nextui-org/react";
import PasswordBtn from "@/app/components/login/PasswordBtn";
import SubmitBtn from "@/app/components/login/SubmitBtn";

export default function SignupInfo({
  onSelected,
  signupData,
}: {
  onSelected: (selectState: string) => void;
  signupData: (signupdata: object) => Promise<void>;
}) {
  const showAlert = useShowAlert();
  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdCheck, setPwdCheck] = useState(false);

  // 使用者輸入確認密碼後才進行檢查，而不是在用戶還沒有輸入確認密碼就立即觸發(pwdCheck 已經被設定為 true)
  useEffect(() => {
    setPwdCheck(password !== pwdConfirm && pwdConfirm !== "");
  }, [password, pwdConfirm]);

  function handleSignUpSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.delete("pwdConfirm");

    const values = Object.fromEntries(formData.entries());
    console.log(values);

    signupData(values)
      .then(() => {
        showAlert("Success!", "註冊成功！", "success");
        setTimeout(() => {
          window.location.href = "/login"; // login success, redirect to home page
        }, 1000);
      })
      .catch((error) => {
        showAlert("Oops...", `註冊失敗，${error}`, "error");
      });
  }

  return (
    <form onSubmit={handleSignUpSubmit}>
      <div className="flex flex-wrap justify-center gap-5 my-5 ">
        <Input
          type="text"
          label="使用者名稱"
          variant="bordered"
          className="max-w-xs"
          size="sm"
          name="name"
        />
        <Input
          type="email"
          label="電子信箱"
          variant="bordered"
          className="max-w-xs"
          size="sm"
          name="email"
        />
        <PasswordBtn
          label="密碼"
          size="sm"
          value={password}
          invalid={false}
          onChanged={setPassword}
          name="password"
        />
        <PasswordBtn
          label="再次輸入密碼"
          size="sm"
          value={pwdConfirm}
          invalid={pwdCheck}
          onChanged={setPwdConfirm}
          name="pwdConfirm"
        />
      </div>
      <SubmitBtn
        btn="註冊"
        hint="已經加入HOHOJIA了嗎？"
        changeBtn="來去登入"
        selectState="login"
        onSelected={onSelected}
      />
    </form>
  );
}
