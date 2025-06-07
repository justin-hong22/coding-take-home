import data from '../mock-data/MOCK_DATA.json';

// This is a tester function to show the intended flow of data from middleware to frontend.
export const fetchData = () => {
	console.log(data)
};

export interface Listing {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	country: string | null;
	language: string | null;
	color: string | null;
};

export function getListingsByField(field: 'color' | 'language', searchValue: string): Listing[]{
	return data.filter((item: Listing) => item[field]?.toLowerCase() === searchValue.toLowerCase());
}

export function getListingGroupedByCountry() : { [country: string]: Listing[] } {
	const groupings: { [country: string]: Listing[] } = {};
	data.forEach(item => {
		const country = item.country ?? "No Country";
		if(!groupings[country]) {
			groupings[country] = [];
		}
		groupings[country].push(item);
	});

	return groupings;
}

export function getListingsWithNull(field: 'color' | 'language'): Listing[] {
  return data.filter((item: Listing) => item[field] === null);
}