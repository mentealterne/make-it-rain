import Dollar from "./Dollar";

const Dollars = () => {
    const dollars = [...Array(100)].map((_, i) => (
        <Dollar
            key={i}
            position={[i / 10, 1, 0]}
        />
    ));

    return (
        <>
            {dollars}

        </>
    );
}

export  default Dollars;
