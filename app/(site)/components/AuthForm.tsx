"use client";

import Button from "@/app/components/button/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocailButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [router, session?.status]);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(({ response }) => toast.error(response.data))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      // NextAuth SignIn
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Sign In
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }

        if (callback?.ok && !callback.error) {
          toast.success("Logged in!");
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              errors={errors}
              label="Name"
              register={register}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            errors={errors}
            register={register}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            errors={errors}
            register={register}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2 ">
            <AuthSocailButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocailButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            {/* <AuthSocailButton
              icon={BsApple}
              onClick={() => socialAction("apple")}
            /> */}
          </div>
          <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="cursor-pointer underline ">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
