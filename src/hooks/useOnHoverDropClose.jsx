import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useOnHoverDropClose = ({ ref }) => {
	const [isOverItem, setIsOverItem] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [isOverList, setIsOverList] = useState(false);
	const [listClicked, setListClicked] = useState(false);
	const item = useRef(ref);

	useLayoutEffect(() => {
		if (isOpen && !isOverList && !isOverItem && !listClicked) {
			item.current?.click();
			setIsOpen(false);
		} else if (!isOpen && (isOverList || isOverItem) && !listClicked) {
			item.current?.click();
			setIsOpen(true);
		}
	}, [isOpen, isOverItem, isOverList, listClicked]);

	useEffect(() => {
		setListClicked(false);
		setClicked(false);
	}, [clicked]);

	let operations = {
		isOpen, isOverItem, isOverList, clicked, listClicked,
		setClicked, setIsOpen, setIsOverItem, setIsOverList, setListClicked
	};

	return { ...operations };
};

export default useOnHoverDropClose;