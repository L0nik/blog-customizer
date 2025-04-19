import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { clsx } from 'clsx';

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
	setArticleState: (articleState: ArticleStateType) => void;
	resetArticleState: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	resetArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [newArticleState, setNewArticleState] =
		useState<ArticleStateType>(articleState);
	const articleParamsRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		articleParamsRef.current!.className = clsx({
			[styles.container]: true,
			[styles.container_open]: isMenuOpen,
		});

		if (isMenuOpen) {
			window.addEventListener('mousedown', handleOutsideClick);
		} else {
			window.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [isMenuOpen]);

	useEffect(() => {
		setNewArticleState({ ...articleState });
	}, [articleState]);

	const handleOutsideClick = (e: Event) => {
		if (
			e.target instanceof Node &&
			!articleParamsRef.current?.contains(e.target)
		) {
			setIsMenuOpen(false);
		}
	};

	const handleArticleParamChange = (
		selected: OptionType,
		paramName: keyof ArticleStateType
	) => {
		const articleStateObj = { ...newArticleState };
		articleStateObj[paramName] = selected;
		setNewArticleState(articleStateObj);
	};

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState({ ...newArticleState });
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside className={styles.container} ref={articleParamsRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={newArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							handleArticleParamChange(selected, 'fontFamilyOption')
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSizeRadioGroup'
						selected={newArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) =>
							handleArticleParamChange(selected, 'fontSizeOption')
						}
					/>
					<Select
						title='цвет шрифта'
						selected={newArticleState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							handleArticleParamChange(selected, 'fontColor')
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={newArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							handleArticleParamChange(selected, 'backgroundColor')
						}
					/>
					<Select
						title='ширина контента'
						selected={newArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							handleArticleParamChange(selected, 'contentWidth')
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetArticleState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
