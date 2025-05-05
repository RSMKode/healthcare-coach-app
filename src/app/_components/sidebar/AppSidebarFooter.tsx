

export async function AppSidebarFooter() {
  const sessionUser = await getSessionUser();

  const UserAvatar = (
    <Avatar className="size-9 rounded-lg">
      {/* <AvatarImage
              src={sessionUser.avatar}
              alt={sessionUser.name}
            /> */}
      <AvatarFallback className="font-semibol rounded-lg border-2 border-accent-primary bg-accent-primary/50 font-semibold text-foreground/80 transition hover:bg-accent-primary/80 hover:text-accent-primary-foreground">
        {sessionUser.token &&
          getInitialsFromName(sessionUser.name || sessionUser.username, 2)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <SidebarFooter>
      <SidebarMenu>
        {sessionUser.token && (
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip={"Perfil"}
                  size={"lg"}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {UserAvatar}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {sessionUser.name}
                    </span>
                    <span className="truncate text-xs font-semibold text-accent-primary">
                      {sessionUser.database}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-widt min-w-56 max-w-full rounded-lg border-2 border-accent-primary bg-background/70 backdrop-blur"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex max-w-full items-center gap-2 overflow-clip truncate p-1 text-left text-sm">
                    {UserAvatar}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {sessionUser.name}
                      </span>
                      <span className="truncate text-xs font-semibold text-accent-primary">
                        {sessionUser.database}
                      </span>
                      <div className="flex flex-col gap-x-2 text-foreground/80">
                        <span className="truncate text-xs font-semibold ">
                          Sucursal {sessionUser.branch?.value} -{" "}
                          {sessionUser.branch?.label}
                        </span>
                        <span className="truncate text-xs font-semibold">
                          Pasillos {sessionUser.aisles?.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {/* <DropdownMenuItem
                  className="w-full gap-1 hover:cursor-pointer"
                  asChild
                > */}
                  <LogoutButton className="w-full" />
                  {/* </DropdownMenuItem> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={"Desarrollado por ExpertOne"}
            className="justify-center border bg-secondary hover:bg-foreground hover:text-background"
            size={"sm"}
          >
            {/* <Link href="/"> */}
            <ExpertOneLogoTiny className="hidden !w-7 group-data-[collapsible=icon]:block" />
            <ExpertOneLogo className="!w-24 group-data-[collapsible=icon]:hidden" />
            {/* </Link> */}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
