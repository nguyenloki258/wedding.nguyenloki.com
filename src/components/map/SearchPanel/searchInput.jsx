/* eslint-disable no-mixed-operators */

import React, { useRef, useState } from 'react';
import Geocoder from '@goongmaps/goong-geocoder-react';
import { FIXED_DATA } from './fixedData';
import MiniSearch from 'minisearch';

const GEOCODER_KEY = 'fwWilEmSnpjjYJEQnB1JgwViOmF6sJ4F00h83eEZ';
const uuid = () => {
    return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
// A collection of documents for our examples
const documents = [
    ...FIXED_DATA
];
let miniSearch = new MiniSearch({
    fields: ['name', 'description'],
    storeFields: ['name', 'latitude', 'longitude', 'description'],
    processTerm: (term, _fieldName) => term.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
});

// Index all documents
miniSearch.addAll(documents)



function SearchInput(props) {
    const searchRef = useRef();
    const id = "id" + uuid();
    const [location, setLocation] = useState(props.locationData);
    // const [resultFixed, setResultFixed] = useState([]);
    const onResult = (data) => {
        const latitude = data?.result?.result?.geometry.location.lat;
        const longitude = data?.result?.result?.geometry.location.lng;
        const name = data?.result?.result?.name;

        const newLocation = {
            latitude,
            longitude,
            name,
            index: props.index
        }
        setLocation(newLocation);
        props.onSearchResult(newLocation);
    }
    const setYourLocation = () => {
        if (navigator.geolocation) {
            const processLocation = async (position) => {
                const latitude = position?.coords?.latitude;
                const longitude = position?.coords?.longitude;
                const name = "Vị trí của bạn";
                const newLocation = {
                    latitude,
                    longitude,
                    name,
                    index: props.index
                }
                if (props.validateSearchInput) {
                    if (props.validateSearchInput(newLocation, props.index)) {
                        setLocation(newLocation);
                        props.onSearchResult(newLocation);
                    }
                } else {
                    setLocation(newLocation);
                    props.onSearchResult(newLocation);
                }
            }
            navigator.geolocation.getCurrentPosition(processLocation);

        } else {
            alert("Vui lòng bật dịch vụ vị trí trên thiết bị của bạn");
        }
    }




    const onLoading = (e) => {
        const resultFixedData = miniSearch.search(e?.query, { fuzzy: 0.2 });
        setTimeout(() => {
            const elm = document.querySelector("#" + id + " .suggestions-wrapper");
            const elmSuggestion = document.querySelector("#" + id + " .suggestions-wrapper .suggestions");
            let hasFixedSuggestion = true;
            let fixedSuggestions = document.querySelector("#" + id + " .suggestions-wrapper .fixed-suggestions ");
            if (!fixedSuggestions) {
                fixedSuggestions = document.createElement('div');
                fixedSuggestions.className = "fixed-suggestions";
                hasFixedSuggestion = false;
            } else {
                fixedSuggestions.innerHTML = "";
            }
            // const div = document.createElement("div");
            resultFixedData.forEach(element => {
                fixedSuggestions.innerHTML += `<a class="fixed-result" data-latitude="${element.latitude}" data-name="${element.name}" data-longitude="${element.longitude}">
                                <div class="goongjs-ctrl-geocoder--suggestion">
                                    <div class="goongjs-ctrl-geocoder--suggestion-title">${element.name}</div>
                                    <div class="goongjs-ctrl-geocoder--suggestion-address">${element.description}</div>
                                </div>
                        </a>`.trim();
                // div.innerHTML = `<li class="active" data-latitude="${element.latitude}" data-name="${element.name}" data-longitude="${element.longitude}">
                //         <a>
                //             <div class="goongjs-ctrl-geocoder--suggestion">
                //                 <div class="goongjs-ctrl-geocoder--suggestion-title">${element.name}</div>
                //                 <div class="goongjs-ctrl-geocoder--suggestion-address">${element.description}</div>
                //             </div>
                //         </a>
                // </li>`.trim();
                // elmSuggestion.insertBefore(div.firstChild, elmSuggestion.childNodes[0]);
            });
            if (!hasFixedSuggestion) {
                elm.insertBefore(fixedSuggestions, elm.childNodes[0]);
            }

            const listFixedElm = document.querySelectorAll("#" + id + " .suggestions-wrapper .fixed-suggestions .fixed-result");
            listFixedElm.forEach(element => {
                element.addEventListener("click", (e) => {
                    const latitude = Number(element.getAttribute('data-latitude'));
                    const longitude = Number(element.getAttribute('data-longitude'));
                    const name = element.getAttribute('data-name');
                    const newLocation = {
                        latitude,
                        longitude,
                        name,
                        index: props.index
                    }
                    setLocation(newLocation);
                    props.onSearchResult(newLocation);
                });
            });
            const elmSuggestionFixed = document.querySelector("#" + id + " .suggestions-wrapper .fixed-suggestions");
            elmSuggestionFixed.style.top = `calc(100% + ${(props.plusOffsetTop || 0) * 50 + 5}px)`;
            const top = elmSuggestionFixed.getBoundingClientRect().height + (props.plusOffsetTop || 0) * 50 + 10;
            elmSuggestion.style.top = `calc(100% + ${top}px)`;

        }, 500);

    }

    return (
        <>
            <div className={props.plusOffsetTop ? 'from-direction' : ''} ref={searchRef} key={id} id={id}></div>

            <Geocoder
                containerRef={searchRef}
                mapRef={props.mapRef}
                placeholder={props.placeholder}
                goongApiAccessToken={GEOCODER_KEY}
                onResult={(e) => onResult(e)}
                onLoading={(e) => onLoading(e)}
                inputValue={location?.name}
            />
            {props.showYourLocation &&
                <img onClick={() => setYourLocation()} className="your-location" alt="your-location" src="images/search/location.svg" />

            }
        </>

    );
}

export default React.memo(SearchInput);