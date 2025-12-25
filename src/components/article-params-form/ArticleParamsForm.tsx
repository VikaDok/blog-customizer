import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Text } from '../../ui/text';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	nowForm: ArticleStateType;
	onApplyForm: (state: ArticleStateType) => void;
	onResetForm: () => void;
};

export const ArticleParamsForm = ({
	nowForm,
	onApplyForm,
	onResetForm,
}: ArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [tempForm, setTempForm] = useState<ArticleStateType>(nowForm);

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isFormVisible) {
			setTempForm(nowForm);
		}
	}, [isFormVisible, nowForm]);

	const closeForm = () => setIsFormVisible(false);

	const handleToggle = () => {
		setIsFormVisible((prev) => !prev);
	};

	useOutsideClickClose({
		isOpen: isFormVisible,
		rootRef: formRef,
		onClose: closeForm,
		onChange: setIsFormVisible,
	});

	const handleApply = () => {
		onApplyForm(tempForm);
		closeForm();
	};

	const handleReset = () => {
		setTempForm(defaultArticleState);
		onResetForm();
		closeForm();
	};

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: ArticleStateType[keyof ArticleStateType]) => {
			setTempForm({
				...tempForm,
				[field]: value,
			});
		};
	};

	return (
		<>
			<ArrowButton isOpen={isFormVisible} onClick={handleToggle} />

			{isFormVisible && (
				<aside
					ref={formRef}
					className={clsx(styles.container, styles.container_open)}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							handleApply();
						}}>
						<Text as='h2' size={31} weight={800} align='left'>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>

						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={tempForm.fontFamilyOption}
							onChange={updateFormField('fontFamilyOption')}
						/>

						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={tempForm.fontSizeOption}
							onChange={updateFormField('fontSizeOption')}
						/>

						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={tempForm.fontColor}
							onChange={updateFormField('fontColor')}
						/>

						<div className={styles.divider} />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={tempForm.backgroundColor}
							onChange={updateFormField('backgroundColor')}
						/>

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={tempForm.contentWidth}
							onChange={updateFormField('contentWidth')}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='clear' onClick={handleReset} />
							<Button title='Применить' type='apply' htmlType='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
