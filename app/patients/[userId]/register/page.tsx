import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";

function RegisterPage() {
  return (
    <div className="flex h-screen max-h-screen overflow-y-hidden">
      <section className="container py-auto h-full overflow-y-auto">
        <div className="sub-container max-w-124">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />

          <div className="text-14-regular mt-20 pb-10 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2026 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-97.5"
      />
    </div>
  );
}

export default RegisterPage;
