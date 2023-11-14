import React from 'react';

function FiltersSideBar(props) {
    const { isDisabled, errorMsg } = props;
    return (
        <div className="flex flex-col gap-[20px] w-[15%] bg-gray-800 p-[20px] fixed h-full">
            <h1 className="text-white text-4xl">Filters</h1>
            <div className="flex flex-col gap-[10px]">
                <h2 className="text-white text-xl">Brand</h2>
                <form>
                    {[...new Set(props.data.map((item) => item.brand))].map((brand, index) => (
                        <div key={index} className="flex items-center gap-[10px]">
                            <label className="text-white flex gap-[5px]">
                                <input
                                    type="checkbox"
                                    name={brand}
                                    id={`checkbox_${index}`}
                                    onChange={(e) => props.handleChangeFilter('brandsChecked', brand, e.target.checked)}
                                    disabled={isDisabled}
                                />
                                {brand}
                            </label>
                        </div>
                    ))}
                </form>
            </div>
            <div className="flex flex-col gap-[10px]">
                <h2 className="text-white text-xl">Sportowcy</h2>
                <form>
                    {[...new Set(props.data.map((item) => item.sportsman))].map((sportsman, index) => (
                        <div key={index} className="flex items-center gap-[10px]">
                            <label className="text-white flex gap-[5px]">
                                <input
                                    type="checkbox"
                                    name={sportsman}
                                    id={`checkbox_${index}`}
                                    onChange={(e) => props.handleChangeFilter('sportsmanChecked', sportsman, e.target.checked)}
                                    disabled={isDisabled}
                                />
                                {sportsman}
                            </label>
                        </div>
                    ))}
                </form>
            </div>
            <form className="flex flex-col gap-[10px]">
                <label htmlFor="from" className="text-white">
                    Cena od:
                </label>
                <div className="text-white flex gap-[5px]">
                    <input type="number" id="from" className="w-[70%] text-black" onChange={(e) => props.handleChangeNum(e)} />
                    zł
                </div>
                <label htmlFor="to" className="text-white">
                    Cena do:
                </label>
                <div className="text-white flex gap-[5px]">
                    <input type="number" id="to" className="w-[70%] text-black" onChange={(e) => props.handleChangeNum(e)} />
                    zł
                </div>
            </form>
            {errorMsg && <p className="text-white">{errorMsg}</p>}
        </div>
    );
}

export default FiltersSideBar;
