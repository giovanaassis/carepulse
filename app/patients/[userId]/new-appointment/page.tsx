import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

async function NewAppointmentPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen overflow-y-hidden">
      <section className="container py-auto h-full overflow-y-auto remove-scrollbar">
        <div className="sub-container max-w-215 flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="justify-items-end text-dark-600 xl:text-left py-12">
            © 2026 CarePulse
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appoointment"
        height={1000}
        width={1000}
        className="side-img max-w-97.5 bg-bottom"
      />
    </div>
  );
}

export default NewAppointmentPage;
