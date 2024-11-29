import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";
import { Home, Settings, FileText, LogIn, Menu } from "lucide-react"; // Replace with desired icons from lucide-react

const AppBarDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <div className="fixed w-full bg-gray-800 text-white">
        <div className="flex items-center justify-between px-4 py-2">
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" onClick={toggleDrawer(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              Luca's Card
            </SheetContent>
            <SheetContent side="left" className="w-64">
              <div
                role="presentation"
                className="flex flex-col gap-2"
                onClick={toggleDrawer(false)}
              >
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => (window.location.href = "/")}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Categorias
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => (window.location.href = "/configuration")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Configurações
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() =>
                    (window.location.href = "/english-portuguese-ipa")
                  }
                >
                  <FileText className="mr-2 h-5 w-5" />
                  IPA (tabela de pronúncias)
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => (window.location.href = "/login")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar
                </Button>
                <Separator />
              </div>
            </SheetContent>
          </Sheet>
          <div id="app-bar-portal"></div>
        </div>
      </div>
    </>
  );
};

export default AppBarDrawer;
