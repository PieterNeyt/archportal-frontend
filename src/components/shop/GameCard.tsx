import {Card, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";

interface ShopCardProps {
    title: string;
    description: string;
    image: string;
}

export function GameCard({title, description, image}: ShopCardProps) {
    return (
        <Card className={"py-4"}>
            <CardBody className={"overflow-visible py-2"}>
                <Image
                    alt={title}
                    className={"object-cover rounded-xl"}
                    src={image}
                    width={270}
                />
            </CardBody>
            <CardFooter className={"justify-between"}>
                <p>{title}</p>
                <p>{description}</p>
            </CardFooter>
        </Card>
    )
}