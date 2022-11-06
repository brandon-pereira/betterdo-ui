import {
    Container,
    CopyContainer,
    Header,
    Description,
    ButtonContainer,
    SecondaryButton,
    Button
} from './NotificationBanner.styles';

interface Props {
    className?: string;
    title: string;
    description: string;
    primaryButtonCopy: string;
    primaryButtonAction: React.MouseEventHandler<HTMLDivElement>;
    secondaryButtonCopy?: string;
    secondaryButtonAction?: React.MouseEventHandler<HTMLButtonElement>;
}

const NotificationBanner = ({
    className,
    title,
    description,
    primaryButtonCopy,
    primaryButtonAction,
    secondaryButtonCopy,
    secondaryButtonAction
}: Props) => (
    <Container className={className} onClick={primaryButtonAction}>
        <CopyContainer>
            <Header>{title}</Header>
            <Description>{description}</Description>
        </CopyContainer>
        <ButtonContainer>
            {secondaryButtonAction && secondaryButtonCopy && (
                <SecondaryButton
                    onClick={e => {
                        e.stopPropagation();
                        secondaryButtonAction(e);
                    }}
                    color="transparent"
                >
                    {secondaryButtonCopy}
                </SecondaryButton>
            )}
            <Button color="rgba(0, 0, 0, 0.2)">{primaryButtonCopy}</Button>
        </ButtonContainer>
    </Container>
);

export default NotificationBanner;
