import { MotionBox, MotionText } from "@/components/Motion";
import { useThemeVars } from "@/hooks/useThemeVars";
import { Box, Link, Stack } from "@mui/material";
import { Link as RRLink } from "react-router-dom";

const Desktop = ({ links }: { links: any[] }) => {
  const { colors } = useThemeVars();
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={4}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      {links.map((link: { pathname: string; href: string; label: string }) => {
        const match = location.pathname === link.href;
        return (
          <Link
            component={RRLink}
            to={link.href}
            key={link.href}
            sx={{
              textDecoration: "none",

              textTransform: "uppercase",
              letterSpacing: "2px",

              transition: "color 0.2s ease-in-out",
              "&:hover": {
                color: colors.nav.linkHoverColor,
              },
            }}
          >
            <Box mb={"2px"} pl={"2px"} textAlign={"center"}>
              <MotionText
                sx={{ fontWeight: "600" }}
                initial={{ fontWeight: "600", color: colors.nav.linkColor }}
                animate={{
                  color: match
                    ? colors.nav.linkActiveColor
                    : colors.nav.linkColor,
                }}
                transition={{ duration: 0.5 }}
              >
                {link.label}
              </MotionText>
            </Box>

            {match && (
              <MotionBox
                sx={{
                  height: "4px",
                  width: "20px",
                  background: colors.secondary,
                  borderRadius: "4px",
                }}
                initial={{ width: 0 }}
                animate={{ width: "20px" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </Link>
        );
      })}
    </Stack>
  );
};
export default Desktop;
