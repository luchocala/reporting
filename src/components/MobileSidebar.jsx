import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, List, User, Check, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccount } from '@/lib/AccountContext';
import { useLocalAuth } from '@/lib/LocalAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/trades', label: 'Trades', icon: List },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAccount, setSelectedAccount, accounts } = useAccount();
  const { user, logout } = useLocalAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex justify-around py-2">
        {/* Botones de navegación */}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Botón de selector de cuentas y usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <User className="h-5 w-5" />
              <span>Menu</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 mb-2">
            {/* Nombre de usuario */}
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs text-muted-foreground">Usuario</p>
              <p className="text-sm font-medium truncate">{user?.username || 'Invitado'}</p>
            </div>

            {/* Selector de cuentas con highlight y ruedita */}
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Cambiar cuenta
            </div>
            {(Array.isArray(accounts) ? accounts : []).map((acc) => (
              <div 
                key={acc.id} 
                className={cn(
                  "flex items-center justify-between group",
                  selectedAccount?.id === acc.id && "bg-primary/10 rounded-md"
                )}
              >
                <DropdownMenuItem
                  onClick={() => setSelectedAccount(acc)}
                  className={cn(
                    "flex-1 cursor-pointer",
                    selectedAccount?.id === acc.id && "text-primary font-medium"
                  )}
                >
                  <span className="truncate">{acc.account_name}</span>
                </DropdownMenuItem>
                
                {/* Botón de configuración de cuenta */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/account-settings/${acc.id}`);
                  }}
                  className="h-7 w-7 mr-1 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shrink-0"
                  title="Configurar cuenta"
                >
                  <Settings className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {(!Array.isArray(accounts) || accounts.length === 0) && (
              <DropdownMenuItem disabled>
                No accounts
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            {/* Botón de logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}