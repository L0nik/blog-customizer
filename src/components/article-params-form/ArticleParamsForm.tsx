import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';

import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({ articleState }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const articleParamsRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		articleParamsRef.current!.className = isOpen
			? `${styles.container} ${styles.container_open}`
			: styles.container;
	});

	const [fontFamily, setFontFamily] = useState<OptionType>(
		articleState.fontFamilyOption
	);
	const handleFontFamilyChange = (selected: OptionType) => {
		setFontFamily(selected);
	};

	const [fontSize, setFontSize] = useState<OptionType>(
		articleState.fontSizeOption
	);
	const handleFontSizeChange = (selected: OptionType) => {
		setFontSize(selected);
	};

	const [fontColor, setFontColor] = useState<OptionType>(
		articleState.fontColor
	);
	const handleFontColorChange = (selected: OptionType) => {
		setFontColor(selected);
	};

	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		articleState.backgroundColor
	);
	const handleBackgroundColorChange = (selected: OptionType) => {
		setBackgroundColor(selected);
	};

	const [contentWidth, setContentWidth] = useState<OptionType>(
		articleState.contentWidth
	);
	const handleContentWidthChange = (selected: OptionType) => {
		setContentWidth(selected);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside className={styles.container} ref={articleParamsRef}>
				<form className={styles.form}>
					<Text size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeRadioGroup'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
