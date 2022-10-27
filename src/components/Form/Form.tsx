import React from 'react';
import cn from 'classnames';
import {Icon} from 'Components';

interface Props {
    children: React.ReactNode;
    onSubmit?: any;
    [x: string]: any;
}

interface FormFieldProps {
    children: React.ReactNode;
    [x: string]: any;
}
function FormField(props: FormFieldProps) {
    const { children, ...rest } = props;
    return (
        <div {...rest} className="flex flex-col mb-4 form-field">
            {children}
        </div>
    );
}

interface Props {
    wrapperClassName?: string;
    className?: string;
    icon?: string;
    leadingButton?: React.ReactNode;
    type?: string;
    rows?: number;
    [x: string]: any;
}
const Input = React.forwardRef((props: Props, ref: any) => {
    const { className = '', leadingButton = '', wrapperClassName = '', icon = '', type = 'text', rows = 4, ...rest } = props;
    return (
        <div className={cn({ relative: icon || leadingButton }, wrapperClassName)}>
            {icon && <Icon name={icon} className="absolute top-0 bottom-0 my-auto ml-4" size="14" />}
            {type === 'textarea' ? (
                <textarea
                    ref={ref}
                    rows={rows}
                    style={{ resize: 'none' }}
                    maxLength={500}
                    className={cn('p-2 outline outline-bluegray_100 border-0 outline-[1px] bg-white w-full rounded', className, { 'pl-10': icon })}
                    {...rest}
                />
            ) : (
                <input
                    ref={ref}
                    type={type}
                    style={{ height: '36px' }}
                    className={cn('p-2 outline outline-bluegray_100 border-0 outline-[1px] bg-white w-full rounded', className, { 'pl-10': icon })}
                    {...rest}
                />
            )}

            {leadingButton && <div className="absolute top-0 bottom-0 right-0">{leadingButton}</div>}
        </div>
    );
});

function Form(props: Props) {
    const { children, ...rest } = props;
    return (
        <form
            {...rest}
            onSubmit={(e) => {
                e.preventDefault();
                if (props.onSubmit) {
                    props.onSubmit(e);
                }
            }}
        >
            {children}
        </form>
    );
}

Form.Field = FormField;

Form.Input = Input;

export default Form;
