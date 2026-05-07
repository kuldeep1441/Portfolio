import { useDisclosure } from '@mantine/hooks';
import { Drawer, Burger } from '@mantine/core';
import { navLinks } from './Header';

const SideBar = ({ activeSection }: { activeSection?: string }) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
            <Drawer.Root
                className="bs:hidden"
                position="right"
                opened={opened}
                onClose={toggle}
                size="60vw"
            >
                <Drawer.Overlay className="!backdrop-opacity-80 blur-sm" />
                <Drawer.Content className="!border-l !border-[#38BDF815]" bg="#0F172A">
                    <Drawer.Body className="mt-20 flex flex-col gap-6" bg="#0F172A">
                        {navLinks(true, toggle, activeSection)}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>

            <Burger
                className="bs:!hidden !z-50 relative"
                size="sm"
                color="#38BDF8"
                opened={opened}
                onClick={toggle}
            />
        </>
    );
};

export default SideBar;
