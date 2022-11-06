import { Container, Icon, Heading, BodyCopy, Button } from './Banner.styles';

interface Props {
    title?: string;
    body: string;
    buttonText?: string;
    buttonAction?: React.MouseEventHandler<HTMLButtonElement>;
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    className?: string;
}

const Banner = ({
    title,
    body,
    buttonText,
    buttonAction,
    icon,
    className
}: Props) => (
    <Container
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
            delay: 0.2,
            duration: 0.4
        }}
        className={className}
    >
        <Icon size="30vmin" icon={icon} />
        <Heading>{title}</Heading>
        <BodyCopy>{body}</BodyCopy>
        {buttonText && (
            <Button color="grey" onClick={buttonAction}>
                {buttonText}
            </Button>
        )}
    </Container>
);

export default Banner;
