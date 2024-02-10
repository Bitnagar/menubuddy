import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
export default function OutputDrawer({ text }: { text: string | any }) {
  return (
    <Drawer>
      <DrawerTrigger
        className="hidden"
        id="drawer"
      >
        Open
      </DrawerTrigger>
      <DrawerContent className="h-2/3 p-4">
        <div className="flex flex-col h-full mt-5 overflow-y-scroll">
          <h1 className="text-2xl font-bold ">You should eat this!</h1>
          <pre className="mt-8 text-sm font-medium text-black text-left text-wrap">
            {text}
          </pre>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
