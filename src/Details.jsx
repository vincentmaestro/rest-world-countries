import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Details = ({countries}) => {
    const {id} = useParams();
    const navigate = useHistory();

    const [country, setCountry] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [borders, setBorders] = useState(null);

    async function getCountry() {
        const getCountries = await countries();
        const country = getCountries.filter(country => country.name.common == id);
        setCountry(country);
        const languages = Object.values(country[0].languages);
        setLanguages(languages);
        const countryCodes = country[0].borders;

        //returns an array of arrays of objects (Multidimensional array)
        // const borders = countryCodes.map(cc => getCountries.filter(country => country.cca3 == cc));

        //returns an array of objects (much preferred)
        const borders = getCountries.filter(country => countryCodes.map(border => border).includes(country.cca3));
        setBorders(borders);
    }

    function goBack() {
        navigate.goBack();
    }

    useEffect(() => {
        getCountry();
    }, [id]);

    return (
        <div className="appwrapper">
            <div className="details">
                <div className="country px-10 576:px-5">
                    <button className="back-button flex items-center gap-1 px-[10px] rounded-[3px] cursor-pointer" onClick={goBack}><i className="ri-arrow-left-line"></i> Back</button>
                    {country && 
                        <div className="data flex mt-10 gap-[15%] 768:gap-[10%] 430:flex-col">
                            <div className="flag w-[40%] 430:w-[95%] 430:mx-auto">
                                <img src={country[0].flags.svg} alt={country[0].flags.alt} className="w-full"/>
                            </div>
                            <div className="data-wrapper w-[40%] py-[20px] 768:w-[50%] 430:mt-5">
                                <h1 className="text-3xl font-bold">{country[0].name.common}</h1>
                                <div className="country-data flex gap-20 mt-6 576:gap-10 430:flex-col 430:mt-3">
                                    <div className="left">
                                        <p className="native-name py-1"><span className="font-semibold">Native Name:</span> {Object.values(country[0].name.nativeName)[0].common}</p>
                                        <p className="population py-1"><span className="font-semibold">Population:</span> {country[0].population}</p>
                                        <p className="region py-1"><span className="font-semibold">Region:</span> {country[0].region}</p>
                                        <p className="sub-region py-1"><span className="font-semibold">Sub Region:</span> {country[0].subregion}</p>
                                        <p className="capital py-1"><span className="font-semibold">Capital:</span> {country[0].capital[0]}</p>
                                    </div>
                                    <div className="right">
                                        <p className="domain py-1"><span className="font-semibold">Top Level Domain:</span> {country[0].tld}</p>
                                        <p className="currencies py-1"><span className="font-semibold">Currencies:</span> {Object.values(country[0].currencies)[0].name}</p>
                                        <p className="languages py-1"><span className="font-semibold">Languages:</span> {languages.map(language => language).join(', ')} </p>
                                    </div>
                                </div>
                                <div className="border-section mt-8 flex gap-1 768:gap-5 430:flex-col">
                                    <p className="w-[50%]">Border Countries: </p>
                                    <div className="borders flex gap-3 gap-y-2 flex-wrap">
                                        {borders && borders.map((border, key) => (
                                            <Link to={`/details/${border.name.common}`} key={key} className="border-country px-4">{border.name.common}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>     
            </div>
        </div>
    );
}
 
export default Details;