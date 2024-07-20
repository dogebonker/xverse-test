import { LookupForm } from "./components";

export function MainPage() {
    return (
        <>
            <header className="h-[88px] flex justify-center items-center">
                <h1 className="font-[500] text-[14px] pb-[17px] pt-[54px]">Ordinal Inscription Lookup</h1>
            </header>
            <section>
                <LookupForm />
            </section>
        </>
    );
}